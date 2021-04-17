const Category = require("../../../../Models/Categories");
const PORT = "3001";
const CATEGORY_ID = "605bba30abf3684d4c7f42d3";
const DOESNT_EXIST_ID = "605bba30abf3684d4c7f42da";
const CATEGORY_NAME_EXPECTED = "Thrill";
describe("Category Tests", () => {
  it("makes a request to create a new category", () => {
    cy.request("POST", `http://localhost:${PORT}/category`, {
      category: "Cinema",
    }).then((response) => {
      expect(response).property("status").to.equal(200);
      expect(response.body).to.have.property("message");
      expect(response.body)
        .property("message")
        .to.include("Category Added Successfully");
    });
  });
  it("Makes a Post request with an Empty Body", () => {
    cy.request({
      url: `http://localhost:${PORT}/category`,
      body: {},
      method: "POST",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response).property("status").to.equal(400);
      expect(response.body).to.have.property("message");
      expect(response.body)
        .property("message")
        .to.include("No Category added,Please Try agaian");
    });
  });
  it("Makes a Patch Request to Update Category", () => {
    cy.request({
      url: `http://localhost:${PORT}/category/${CATEGORY_ID}`,
      body: { categoryName: "Fiction" },
      method: "PATCH",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response).property("status").to.equal(200);
      expect(response.body)
        .property("message")
        .to.include("Category Updated Successfully");
    });
  });
  it("Makes a Patch Request to Update Category Which Doesn't Exist", () => {
    cy.request({
      url: `http://localhost:${PORT}/category/${DOESNT_EXIST_ID}`,
      body: { category: "Fiction" },
      method: "PATCH",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response).property("status").to.equal(400);
      expect(response.body)
        .property("message")
        .to.include("Category doesn't exist !");
    });
  });

  it("Makes a Delete Request to Delete the newly created category by cypress", () => {
    cy.task("getCategoriesTask").then((categories) => {
      const lastCategoryId = categories[2]._id; // change the index based on the record number in the database
      cy.request({
        url: `http://localhost:${PORT}/category/${lastCategoryId}`,
        method: "DELETE",
      }).then((response) => {
        expect(response).property("status").to.equal(200);
        expect(response.body)
          .property("message")
          .to.include("Category Deleted Successfully !");
      });
    });
  });

  // console.log(lastCategoryId);

  it("Makes a get request to fetch all categories", () => {
    //my first category is Thrill , change it to first category in ur db
    cy.request({
      url: `http://localhost:${PORT}/category`,
      method: "GET",
      failOnStatusCode: false,
    }).as("categories");
    cy.get("@categories")
      .its("body")
      .its(0)
      .its("category")
      .should("include", CATEGORY_NAME_EXPECTED);
  });
});
