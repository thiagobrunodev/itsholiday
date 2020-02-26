/*
 *   Copyright (c) 2020 Thiago Bruno Vieira <thiagobruno.dev@gmail.com>
 *   All rights reserved.

 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:

 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.

 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const chrome = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');
const findChrome = require('chrome-finder');
const mime = require('mime-types');

const PORT = process.env.PORT || 8125;
const isSpa = true;
const buildPath = './dist';

const server = http
    .createServer(async (request, response) => {
        let filePath = path.resolve(
            request.url === '/' ? `${buildPath}/index.html` : `${buildPath}/${request.url}`,
        );

        if (isSpa && !(await fs.existsSync(filePath))) {
            filePath = path.resolve(`${buildPath}/index.html`);
        }

        const contentType = mime.contentType(filePath);

        try {
            const fileBuffer = fs.readFileSync(filePath);

            response.writeHead(200, { 'Content-Type': contentType });
            response.end(fileBuffer, 'utf-8');

            console.log(`${request.method} - ${request.url} => ${filePath}`);
        } catch (error) {
            response.writeHead(500, { 'Content-Type': 'text/html' });
            response.end(
                `<style>h2 {text-align: center; font-family: arial;}</style>
                <h2>Sorry, check with the site admin for error: ${error.code}.</h2>`,
            );

            console.log(`Error code ${error.code} trying ${request.method} ${filePath} ${contentType}`);
        }
    })
    .listen(PORT);

console.log(`HTTP using http://127.0.0.1:${PORT}`);

(async () => {
    try {
        const browser = await puppeteer.launch({
            args: [...chrome.args, '--headless', '--disable-gpu'],
            executablePath: await chrome.executablePath || findChrome(),
            headless: chrome.headless,
        });

        const page = await browser.newPage();
        await page.goto(`http://127.0.0.1:${PORT}`);

        console.log(await page.title());

        const file = await page.content();

        await browser.close();

        await fs.writeFileSync(path.resolve(`${buildPath}/index.html`), file);
    } catch (error) {
        console.error(error);
    }

    server.close();
})();
