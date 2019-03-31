require('dotenv').config();
import {browser, element, by, $, $$, ExpectedConditions as EC} from "protractor";
import {HomePage} from '../page_objects/home.page'
import {LoginPage} from "../page_objects/login.page";
import {DashboardPage} from "../page_objects/dashboard.page";

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();

describe('angularjs homepage todo list', function() {

    beforeAll(async function() {
       await new HomePage().openWebSite()
    });

    it('should add a todo', async function() {
        element(by.model('todoList.todoText')).sendKeys('write first protractor test');
        element(by.css('[value="add"]')).click();

        const todoList = element.all(by.repeater('todo in todoList.todos'));
        await expect(await todoList.count()).toEqual(3);
        expect(await todoList.get(2).getText()).toEqual('write first protractor test');

        // You wrote your first test, cross it off the list
        todoList.get(2).element(by.css('input')).click();
        const completedAmount = element.all(by.css('.done-true'));
        expect(await completedAmount.count()).toEqual(2);
        // expect(await completedAmount.count()).toEqual(4);
    });
});