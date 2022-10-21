describe("Blog app", () => {
    beforeEach(() => {
        localStorage.removeItem("BlogUser");
        cy.request("POST", "http://localhost:3003/api/testing/reset");
        cy.visit("http://localhost:3000");
    });

    it("Login form is shown", () => {
        cy.visit("http://localhost:3000");

        cy  .get("#frmLogin")
            .get("#txtUsername")
            .type("username");
        cy  .get("#frmLogin")
            .get("#txtPassword")
            .type("password");
        cy  .get("#frmLogin")
            .get("#btnLogin")
            .should("have.attr", "type", "submit");
    });
});
