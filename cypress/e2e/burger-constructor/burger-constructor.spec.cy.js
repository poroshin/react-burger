describe('app works correctly with routes', function() {
  before(function() {
    cy.visit('http://localhost:3000');
  });

  it("click and dnd bun to constructor elements", function () {
    cy.contains("Флюоресцентная булка R2-D").trigger("dragstart");
    cy.get("[class^=burger-constructor_ingredients]").trigger("drop");
    cy.get("[class^=burger-constructor_elements]").contains("Флюоресцентная булка R2-D");
  });

  it("scroll to sauce", function () {
    cy.get("[class^=tab_tab]").contains("Соусы").click();
    cy.contains("Соус Spicy-X");
  });

  it("click and dnd sauce to constructor elements", function () {
    cy.contains("Соус Spicy-X").trigger("dragstart");
    cy.get("[class^=burger-constructor_ingredients]").trigger("drop");
    cy.get("[class^=burger-constructor_elements]").contains("Соус Spicy-X");
  });
  
  it("scroll to main", function () {
    cy.get("[class^=tab_tab]").contains("Начинки").click();
    cy.contains("Соус Spicy-X");
  });
  
  it("view details", function () {
    cy.get("[class^=burger-ingredients_link]").contains("Protostomia").click();
    cy.contains("Детали ингредиента");
    cy.get("[class^=modal_modal__button]").click();
  });

  it("click and dnd main to constructor elements", function () {
    cy.contains("Protostomia").trigger("dragstart");
    cy.get("[class^=burger-constructor_ingredients]").trigger("drop");
    cy.get("[class^=burger-constructor_elements]").contains("Protostomia");
  });
  
  it("ordering", function () {
    cy.get("[class^=burger-constructor_checkout]").contains("Оформить").click();
    cy.wait(2000);
    cy.get("input[name=email]").click();
    cy.get("input[name=email]").type("poroshin.a.v@yandex.ru");
    cy.get("input[name=password]").click();
    cy.get("input[name=password]").type(`testtest{enter}`);
    cy.wait(2000);
    cy.contains("Оформить").click();
    cy.contains("Ваш заказ обрабатывается");
    cy.wait(16000);
    cy.contains("Дождитесь готовности на орбитальной станции");
    cy.get("[class^=modal_modal__button]").click();
  });
});
