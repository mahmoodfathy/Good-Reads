// const cy = require('cypress');
const PORT = "3001";
const baseURL = `http://localhost:${PORT}/author`;
const AUTHOR_ID = "6064958768d2c64e3cf01df6";
const BOOK_ID = "6064969768d2c64e3cf01df7";
const DOESNT_EXIST_Author_ID = "6064969768d2c64e3cf01df8";
describe("Author Api Tests", () => {
  it("Makes a Request to create a new Author", () => {
    cy.request("POST", baseURL, {
      firstname: "Ahmed",
      lastname: "Ali",
      dob: "4-4-2021",
      shortdescription: "Awesome Author",
      imageURL: "www.hobalala.com",
    }).then((response) => {
      expect(response).property("status").to.equal(200);
      expect(response.body)
        .to.have.property("message")
        .to.include("Author Added Successfully");
    });
  });
  it("Makes a request with an empty body", () => {
    cy.request({
      url: baseURL,
      body: {},
      method: "POST",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response).property("status").to.equal(500);
      expect(response.body).to.have.property("errors");
    });
  });
  it("Makes a request to update some Fields", () => {
    cy.request({
      url: `${baseURL}/${AUTHOR_ID}`,
      method: "PATCH",
      body: {
        lastname: "fathy",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response).property("status").to.equal(200);
      expect(response.body).to.have.property("message");
      expect(response.body)
        .property("message")
        .to.include("Author updateded Successfully");
    });
  });
  it("Makes an update request to an id that doesnt exist in database", () => {
    cy.request({
      url: `${baseURL}/${DOESNT_EXIST_Author_ID}`,
      method: "PATCH",
      body: {
        lastname: "fathy",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response).property("status").to.equal(400);
      expect(response.body).to.have.property("message");
      expect(response.body)
        .property("message")
        .to.include("Author not updated !");
    });
  });
  it("Makes a Delete Request to Delete the newly created Author by cypress", () => {
    cy.task("getAuthorsTask").then((authors) => {
      const lastAuthorId = authors[1]._id; //change the index based on the index of the document in the database
      cy.request({
        url: `${baseURL}/${lastAuthorId}`,
        method: "DELETE",
      }).then((response) => {
        expect(response).property("status").to.equal(200);
        expect(response.body)
          .property("message")
          .to.include("Author Deleted Successfully");
      });
    });
  });
  it("Makes a Delete Request to non existing id in the database", () => {
    cy.request({
      url: `${baseURL}/${DOESNT_EXIST_Author_ID}`,
      method: "DELETE",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response).property("status").to.equal(400);
      expect(response.body)
        .property("message")
        .to.include("Author doesnt exist");
    });
  });
});
