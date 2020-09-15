function getToken() {
  return localStorage.getItem("token");
}

async function getUserByToken(token) {
  try {
    const res = await axios.get("https://api.marktube.tv/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log("getUserByToken error", err);
    return null;
  }
}

async function getBooks(token) {
  try {
    const res = await axios.get("https://api.marktube.tv/v1/book", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log("getBooks error", err);
    return null;
  }
}

async function deleteBook(bookId) {
  const token = getToken();
  if (token === null) {
    location.assign("/login");
    return;
  }
  await axios.delete(`https://api.marktube.tv/v1/book/${bookId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return;
}

function renderBooks(books) {
  const listElement = document.querySelector("#book-list");
  books.forEach((book) => {
    const bookElement = document.createElement("div");
    bookElement.classList.value = "book";
    bookElement.innerHTML = `
        <div class="book">
            <div class="title">
                ${book.title === "" ? "제목 없음" : book.title}
            </div>
            <a href="#">
                <button class="btn btn--book">보기</button>
            </a>
            <a href="#">
                <button class="btn btn--book btn--book-delete" data-book-id="${
                  book.bookId
                }">삭제</button>
            </a>
            <div class="date">${new Date(book.createdAt).toLocaleString()}</div>
        </div>
        `;
    listElement.append(bookElement);

    document.querySelectorAll(".btn--book-delete").forEach((element) => {
      element.addEventListener("click", async (event) => {
        const bookId = event.target.dataset.bookId;
        try {
          await deleteBook(bookId);
          location.reload();
        } catch (err) {
          console.log("delete book error", err);
        }
      });
    });
  });
}

async function main() {
  // 사용자 토큰 불러오기
  const token = getToken();
  if (token === null) {
    location.assign("/login");
    return;
  }

  // 토큰으로 서버에서 사용자 정보 불러오기
  const user = await getUserByToken(token);
  if (user === null) {
    localStorage.clear();
    location.assign("/login");
    return;
  }

  // 토큰으로 서버에서 책 정보 불러오기
  const books = await getBooks(token);
  if (books === null) {
    return;
  }
}
// document.addEventListener("DOMContentLoaded", main);

function loginGoogle(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId());
  console.log("Name: " + profile.getName());
}
