describe("Blog app", () => {
    beforeEach(() => {
        localStorage.removeItem("BlogUser");
        cy.request("POST", "http://localhost:3003/api/testing/reset");
        cy.request("POST", "http://localhost:3003/api/users", {
            name: "Tester A",
            username: "testerA",
            password: "Test-PW1"
        });
        cy.visit("http://localhost:3000");
    });

    it("Login form is shown", () => {
        cy.visit("http://localhost:3000");

        cy.get("#frmLogin")
            .get("#txtUsername");
        cy.get("#frmLogin")
            .get("#txtPassword");
        cy.get("#frmLogin")
            .get("#btnLogin")
            .should("be.visible");
    });

    describe("Login", () => {
        it("succeeds with correct credentials", () => {
            cy.visit("http://localhost:3000");

            cy.get("#frmLogin")
                .get("#txtUsername")
                .type("testerA");
            cy.get("#frmLogin")
                .get("#txtPassword")
                .type("Test-PW1");
            cy.get("#frmLogin")
                .get("#btnLogin")
                .click();
            cy.get("#frmLogin")
                .should("not.exist");
            cy.contains("Logged in as testerA");
        });

        it("fails with wrong credentials", () => {
            cy.visit("http://localhost:3000");

            cy.get("#frmLogin")
                .get("#txtUsername")
                .type("testerA");
            cy.get("#frmLogin")
                .get("#txtPassword")
                .type("Wrong");
            cy.get("#frmLogin")
                .get("#btnLogin")
                .click();
            cy.get("#frmLogin")
                .should("be.visible");
            cy.contains("Invalid username or password")
                .should("have.css", "color", "rgb(255, 0, 0)");
            cy.contains("Logged in as testerA")
                .should("not.exist");

        });
    });
});
