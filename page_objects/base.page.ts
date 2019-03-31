import { browser } from 'protractor';
require('dotenv').config();

export abstract class BasePage {
    protected website_url: string = 'https://angularjs.org';
    protected adminPanel_url: string = process.env.ADMIN_PANEL_URL;

    async openWebSite () {
        return await browser.get(this.website_url);
    }

    async openAdminPanel () {
        return await browser.get(this.adminPanel_url);
    }
}