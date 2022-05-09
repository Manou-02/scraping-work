import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { locationFrance, urlParent } from "../../../utils/endpoint";

@Injectable()
export class LocationService {

    /**Fonction initialiser page */
    async initialisePage(url){
        try{
            const browser = await puppeteer.launch({
                "dumpio": true,
                "headless": true,
                "executablePath": '/usr/bin/chromium',
                "args": [
                    '--disable-setuid-sandbox',
                    '--no-sandbox',
                    '--disable-gpu',
                ]
            })
            const page = await browser.newPage();
            await page.setDefaultNavigationTimeout(0); 
    
            await page.goto(url,{
                //effacer le timeout et atterndre jusqu'à la recuperation des données
                waitUntil : 'load',
                timeout : 0
            });
    
            return page;
            
        }catch(err){
            console.log(`Erreur lors de l'initialisation du page \n ${err}`);
        }
    }

    /**Function get all location */
    async getLocationService(){
        const url = locationFrance.url +1   ;
        
        try{
            const page = await this.initialisePage(url);
            const location = await page.evaluate(() => {
                let data = [];
                let elements = document.querySelectorAll("article.sideListItem");
                
                elements.forEach(element => {

                    data.push({
                        titre : element.querySelector('.detailsContainer  h3.descriptionTitle')?.textContent.split('m²')[0].concat(" m²"),
                        adresse : element.querySelector('.detailsContainer h3.descriptionTitle span')?.textContent,
                        prix : element.querySelector('.detailsContainer div.price span.thePrice')?.textContent,
                        prixDetail : element.querySelector('.detailsContainer div.price span.perMonth')?.textContent,
                        description : element.querySelector('.detailsContainer div.descriptionContent')?.textContent.split('\n').join(' '),
                        url : element.querySelector('.sideListItemContainer .detailsContainer .details a.detailedSheetLink').getAttribute('href'),
                        details : {
                            
                        }
                    });
                })

                // console.log(data);
                return data;
            });
            return location;

        }catch(err){
            console.log(`Erreur lors de la recuperation des données \n ${err}`);
        }

        return url;
    }

    async getDetailService(data){
        try{

            const urlBase = urlParent.url;
            data.forEach(async element => {
                const page = await this.initialisePage(urlBase + element.url);
                const information = await page.evaluate(() => {
                    
                })
            });

        }catch(err){
            console.log(`Erreur lors de la recuperation des details`);
            
        }
    }


    async getFinalLocation() {
        try{
            const info = await this.getLocationService();
            const infoDetail = this.getDetailService(info);
            
            return info;
        }catch(err){
            console.log(``);
            
        }
    }

}
