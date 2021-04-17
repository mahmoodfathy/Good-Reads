// const cy = require('cypress');
const PORT = "3001";
const baseURL = `http://localhost:${PORT}/book`;
const CATEGORY_ID = "6059de04091cf556fc6beef9";
const AUTHOR_ID = "6064958768d2c64e3cf01df6";
const BOOK_ID = "6064969768d2c64e3cf01df7";
const DOESNT_EXIST_BOOK_ID = "6064969768d2c64e3cf01df8";
describe("Book Api Tests", () => {
  it("Makes a Request to create a new book", () => {
    cy.request("POST", baseURL, {
      name: "Queens Gambit",
      category: CATEGORY_ID,
      author: AUTHOR_ID,
      description: "Awesome book",
      cover: "www.hobalala.com",
    }).then((response) => {
      expect(response).property("status").to.equal(200);
      expect(response.body).to.have.property("name");
      expect(response.body).to.have.property("category");
      expect(response.body).to.have.property("author");
      expect(response.body).to.have.property("description");
      expect(response.body).to.have.property("cover");
    });
  });
  it("Makes a request with an empty body", () => {
    cy.request({
      url: baseURL,
      body: {},
      method: "POST",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response).property("status").to.equal(400);
      expect(response.body).to.have.property("message");
      expect(response.body).property("message").to.include("Field missing!");
    });
  });
  it("Makes a request to update some Fields", () => {
    cy.request({
      url: `${baseURL}/${BOOK_ID}`,
      method: "PATCH",
      body: {
        name: "ketab 7ayaty ana 2",
        description: "book of my life 2",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response).property("status").to.equal(200);
      expect(response.body).to.have.property("message");
      expect(response.body)
        .property("message")
        .to.include("updated book successfully!");
    });
  });
  it("Makes an update request to an id that doesnt exist in database", () => {
    cy.request({
      url: `${baseURL}/${DOESNT_EXIST_BOOK_ID}`,
      method: "PATCH",
      body: {
        name: "ketab 7ayaty ana 2",
        description: "book of my life 2",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response).property("status").to.equal(404);
      expect(response.body).to.have.property("message");
      expect(response.body).property("message").to.include("book not exist");
    });
  });
  it("Makes a Delete Request to Delete the newly created Book by cypress", () => {
    cy.task("getBooksTask").then((books) => {
      const lastBookId = books[3]._id; //change the index based on the index of the document in the database
      cy.request({
        url: `${baseURL}/${lastBookId}`,
        method: "DELETE",
      }).then((response) => {
        expect(response).property("status").to.equal(200);
        expect(response.body).property("name").to.include("Queens Gambit");
      });
    });
  });
  it("Makes a Delete Request to non existing id in the database", () => {
    cy.request({
      url: `${baseURL}/${DOESNT_EXIST_BOOK_ID}`,
      method: "DELETE",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response).property("status").to.equal(404);
      // expect(response.body).property("name").to.include("Queens Gambit");
    });
  });
});
