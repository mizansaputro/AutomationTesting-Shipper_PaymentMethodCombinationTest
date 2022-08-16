import { Selector,t } from "testcafe";
import { faker } from '@faker-js/faker';
const _ = require('lodash');
import { ClientFunction } from 'testcafe';

class AdidasPageVer2{
    constructor(){
        this.getURL = ClientFunction(() => window.location.href);
        this.pageURL = 'https://adidasindonesiaqa.avana.asia/';
        
        this.itemDetail_size_select = Selector('#productOptionValue');
        this.itemDetail_qty_input = Selector('#productQuantity');
        this.itemDetail_addToCart_btn = Selector('#catalogProductDetailAdd > a');

        this.checkout_btn = Selector('#shopBag > div > div.simple-ajax-popup-align-top.btn-checkout > div.cart-price');
        this.checkout_note_input = Selector('#custom-field-form > div').find('input');
        this.checkout_couponCode_input = Selector('#__cc1 > div > div.coupon > div > div > input');
        this.checkout_apply_btn = Selector('#__cc1 > div > div.coupon > div > div > div > a');
        this.checkout_proceed_btn = Selector('#next > a');

        this.checkout_firstName_input = Selector('#firstname');
        this.checkout_lastName_input = Selector('#lastname');
        this.checkout_phoneNumber_input = Selector('#phone');
        this.checkout_email_input = Selector('#email');
        this.checkout_address1_input = Selector('#address1');
        this.checkout_address2_input = Selector('#address2');
        this.checkout_postCode_input = Selector('#postcode');
        this.checkout_country_select = Selector('#country');
        this.checkout_state_select = Selector('#state');
        this.checkout_city_input = Selector('#city');

        this.checkout_shippingAddress_slider = Selector('#shippingDetails > div.address-container.clearfix > div.shipping-address > div.shipping-heading > div > div > label');
        this.checkout_saFirstName_input = Selector('#shippingDetails > div.address-container.clearfix > div.billing-address.billing-show.fade-in > table > tbody > tr:nth-child(1) > td:nth-child(2) > #firstname');
        this.checkout_saLastName_input = Selector('#shippingDetails > div.address-container.clearfix > div.billing-address.billing-show.fade-in > table > tbody > tr:nth-child(2) > td:nth-child(2) > #lastname');
        this.checkout_saEmail_input = Selector('#shippingDetails > div.address-container.clearfix > div.billing-address.billing-show.fade-in > table > tbody > tr:nth-child(3) > td:nth-child(2) > #email');
        this.checkout_saPhoneNumber_input = Selector('#shippingDetails > div.address-container.clearfix > div.billing-address.billing-show.fade-in > table > tbody > tr:nth-child(4) > td:nth-child(2) > #phone');
        this.checkout_saAddress1_input = Selector('#shippingDetails > div.address-container.clearfix > div.billing-address.billing-show.fade-in > table > tbody > tr:nth-child(5) > td:nth-child(2) > #address1');
        this.checkout_saAddress2_input = Selector('#shippingDetails > div.address-container.clearfix > div.billing-address.billing-show.fade-in > table > tbody > tr:nth-child(6) > td:nth-child(2) > #address2');
        this.checkout_saCountry_select = Selector('#shipping_country');
        this.checkout_saState_select = Selector('#shipping_state');
        this.checkout_saCity_input = Selector('#shipping_city');
        this.checkout_saPostCode_input = Selector('#shippingDetails > div.address-container.clearfix > div.billing-address.billing-show.fade-in > table > tbody > tr:nth-child(10) > td:nth-child(2) > #postcode');

        this.item_name;
        this.item_price;
        this.itemData = [];
        this.courierList = ["Lion Parcel","JNE","SAP","Tiki","Wahana","SiCepat"];
        this.paymentMethodList = ['Danamon Online Banking','Danamon Virtual Account','Mandiri Virtual Account',
        'Maybank Virtual Account','Permata Virtual Account','BNI','CIMB Niaga','BCA',
        'Hana Bank','OVO','QRIS ShopeePay','Dana','Manual Payment Transfer'];
        this.courierData = [];
        this.ratePrice;
        this.insurancePrice;
        this.detailTransactionList = [];
        this.itemName;
        this.itemPrice;
        this.itemSize;
        this.itemQty;
        this.shippingName;
        this.shippingRate;
        this.subtotal;
        this.shippingRate2;
        this.shippingInsurance;
        this.tax;
        this.disc;
        this.total;
        this.dataTransaction_WebStore = [];


        this.paymentMethodData = [];
    }
    async selectItem(series='adidas Originals NMD_V3'){
        await this.assertHomePage();

        let parent = Selector('#catalog-thumbs');
        while (await parent.exists){
            let getText = parent.find('div.product-container > div.catalog-front-name > div.product-title-thumbs > a');
            let getPrice = parent.find('div.product-container > div.catalog-front-price > span.normal-price');
            
            if (await getText.textContent==series){
                this.item_name = await getText.textContent;
                
                this.item_price = parseInt((await getPrice.textContent).replace(/^\s+|\s+$/gm,'').replace(/\./g,'').slice(4));
                //console.log(this.item_price);
                await t
                    .click(getText);
                //this.detailTransactionList.push(this.item_name,this.item_price);
                break;
            }
            parent = parent.nextSibling();
        }
        await t
            .expect(parent.exists).ok('Item is not found!');
    }
    async assertHomePage(){
        await t
            .expect(this.getURL()).contains(this.pageURL,'Page Link is Incorrect!');
    }
    async assertDetailPage(){
        let itemDetail_linkName = await Selector('#catalogProductDetailContentContainer > div > div.container-fluid > ul > li.active > a > span').textContent;
        let itemDetail_name = await Selector('#catalogProductDetailInfo > div.productDetailsName').textContent;
        let itemDetail_price = parseInt((await Selector('#catalogProductDetailInfo > div.details-product-price > span.price-sale').textContent).replace(/^\s+|\s+$/gm,'').replace(/\./g,'').slice(4));
        //console.log(itemDetail_price+" "+ this.itemPrice);
        await t
            .expect(itemDetail_linkName).eql(this.item_name,'Different Item Name Between Home Page & Link Item!')
            .expect(itemDetail_name).eql(this.item_name,'Different Item Name Between Home Page & Detail Item!')
            .expect(itemDetail_price).eql(this.item_price,"Different Item Price Between Home Page & Detail Item!")
            .expect(this.itemDetail_addToCart_btn.exists).ok("Add to Cart Button is not exists!");
        /*console.log(itemDetail_linkName);
        console.log(itemDetail_name);
        console.log(itemDetail_price);*/
    }
    async fillDetailItemPage(size=40,quantity=1){
        await this.assertDetailPage();
        
        if (typeof(size)=='number'){
            size = size.toString();
        }
        if (typeof(quantity)=='number'){
            quantity = quantity.toString();
        }
        let itemDetail_name = await Selector('#catalogProductDetailInfo > div.productDetailsName').textContent;
        let itemDetail_price = parseInt((await Selector('#catalogProductDetailInfo > div.details-product-price > span').textContent).replace(/^\s+|\s+$/gm,'').replace(/\./g,'').slice(4));
    
        let selectSize = Selector('#productOptionValue > option').withText(size);
        if (await this.itemDetail_size_select.exists){
            await t
                .click(this.itemDetail_size_select)
                .expect(selectSize.exists).ok('Size is not in option list!')
                .click(selectSize)
        }else{
            size = -1;
        }
        await t
            .typeText(this.itemDetail_qty_input,quantity,{replace:true})
            .click(this.itemDetail_addToCart_btn);
        
        this.itemName = itemDetail_name;
        this.itemPrice = itemDetail_price;
        this.itemSize = size;
        this.itemQty = parseInt(quantity);
        this.itemData.push([itemDetail_name,itemDetail_price,size,parseInt(quantity)]);
    }
    async assertfillCheckout_ConfirmOrder(){
        let subTotal_val = 0;
        let tableVal_product = Selector('#__cc1 > table > thead > tr > td.cartTableTitle.product-tbl > b').textContent;
        let tableVal_qty = Selector('#__cc1 > table > thead > tr > td.cartTableTitle.quantity-tbl > b').textContent;
        let tableVal_price = Selector('#__cc1 > table > thead > tr > td:nth-child(4) > b').textContent;
        //let price = parseInt((await Selector('#checkout-product-473702_1055372 > td.cartTableItem.price-product > b > span').textContent).replace(/^\s+|\s+$/gm,'').replace(/\./g,''));
        let subtotal = parseInt((await Selector('#__cc1 > div > div.checkout-total-info.clearfix > div.checkout-row-subtotal.clearfix > div.order-total-amount > span').textContent).replace(/^\s+|\s+$/gm,'').replace(/\./g,'').slice(4));

        await t
            .expect(this.getURL()).contains('https://adidasindonesiaqa.avana.asia/shopping-bag','Different Page (Should be on Checkout Page)')
            .expect(await tableVal_product=='Product').ok('Table not found!')
            .expect(await tableVal_qty=='Quantity').ok('Table not found!')
            .expect(await tableVal_price=='Price').ok('Table not found!');
        
        let itemTable = Selector('#__cc1 > table > tbody').find('tr');
        let i = 0;
        while (await itemTable.exists){
            let itemName = itemTable.find('td.productDetailsInfo > span > span > b').textContent;
            let itemPrice = parseInt((await itemTable.find('td.cartTableItem.price-product > b > span').textContent).replace(/^\s+|\s+$/gm,'').replace(/\./g,''));
            if (await itemTable.find('td.productDetailsInfo > span > span > span > a').exists){
                let itemSize = (await itemTable.find('td.productDetailsInfo > span > span > span > a').textContent).slice(8,10);
                
                await t
                    .expect(itemSize).eql(this.itemData[i][2]);
                //console.log(await itemSize+' '+this.itemData[i][2]);
            }
            //console.log(await itemName+' '+this.itemData[i][0]);
            //console.log(await itemPrice+' '+this.itemData[i][1]*parseInt(this.itemData[i][3]));

            await t
                .expect(await itemName).eql(this.itemData[i][0])
                .expect(itemPrice).eql(this.itemData[i][1]*parseInt(this.itemData[i][3]));
    
            subTotal_val+=itemPrice;
            i++;
            itemTable = itemTable.nextSibling();
        }
        //console.log(subTotal_val+' '+subtotal);
        await t
            .expect(subTotal_val).eql(subtotal);
    }
    async fillCheckout_ConfirmOrder(couponCode='',note=faker.random.words(3)){
        await this.assertfillCheckout_ConfirmOrder();
        await t
            .typeText(this.checkout_note_input,note,{replace:true});
        
        if (couponCode.length!=0){
            await t
                .typeText(this.checkout_couponCode_input,couponCode,{replace:true})
                .click(this.checkout_apply_btn);
        }

    }
    async assertFillCheckout_ShippingAddress(){
        let title = await Selector('#shippingDetails > div.address-container.clearfix > div.shipping-address > div.shipping-heading > h3').textContent;
        await t
            .expect(this.getURL()).contains('https://adidasindonesiaqa.avana.asia/shopping-bag','Wrong Page!')
            .expect(title).contains('Billing Address', 'Wrong Page!'); 
    }
    async fillCheckout_ShippingAddress_BillingAddress(country='Indonesia',
        state='Bali',
        city='UBUD',
        postcode=faker.random.numeric(5),
        fn=faker.name.firstName(),
        ln=faker.name.lastName(),
        email=`${fn}${ln}@gmail.com`,
        phone=faker.phone.number('089#########'),
        address1=faker.address.streetAddress(),
        address2=faker.address.streetAddress()){
        
        await this.assertFillCheckout_ShippingAddress();
        await t
            .typeText(this.checkout_firstName_input,fn,{replace:true})
            .typeText(this.checkout_lastName_input,ln,{replace:true})
            .typeText(this.checkout_email_input,email,{replace:true})
            .typeText(this.checkout_phoneNumber_input,phone,{replace:true})
            .typeText(this.checkout_address1_input,address1,{replace:true})
            .typeText(this.checkout_address2_input,address2,{replace:true})
            .click(this.checkout_country_select)
            .click(this.checkout_country_select.find('option').withText(country))
            .click(this.checkout_state_select)
            .click(this.checkout_state_select.find('option').withText(state))
            .typeText(this.checkout_city_input,city,{replace:true})
            .click(Selector('#shippingDetails > div.address-container.clearfix > div.shipping-address > table > tbody > tr:nth-child(9) > td:nth-child(2) > span > div > div'))
            .typeText(this.checkout_postCode_input,postcode,{replace:true});
    }
    async fillCheckout_ShippingAddress_EnableDifferentSA(country='Indonesia',
        state='Bali',
        city='UBUD',
        postcode=faker.random.numeric(5),
        fn=faker.name.firstName(),
        ln=faker.name.lastName(),
        email=`${fn}${ln}@gmail.com`,
        phone=faker.phone.number('089#########'),
        address1=faker.address.streetAddress(),
        address2=faker.address.streetAddress()){
        await t
            .click(this.checkout_shippingAddress_slider)
            .typeText(this.checkout_saFirstName_input,fn,{replace:true})
            .typeText(this.checkout_saLastName_input,ln,{replace:true})
            .typeText(this.checkout_saEmail_input,email,{replace:true})
            .typeText(this.checkout_saPhoneNumber_input,phone,{replace:true})
            .typeText(this.checkout_saAddress1_input,address1,{replace:true})
            .typeText(this.checkout_saAddress2_input,address2,{replace:true})
            .click(this.checkout_saCountry_select)
            .click(Selector('#shipping_country > option').withText(country))
            .click(this.checkout_saState_select)
            .click(Selector('#shipping_state > option').withText(state))
            .typeText(this.checkout_saCity_input,city,{replace:true})
            .click(Selector('#shippingDetails > div.address-container.clearfix > div.billing-address.fade-in.billing-show > table > tbody > tr:nth-child(9) > td:nth-child(2) > span > div > div'))
            .typeText(this.checkout_saPostCode_input,postcode,{replace:true});
    }
    async fillCheckout_ShippingAddress_Shipper(name){
        await t
            .expect(await Selector('#shipper_area').exists).ok('Shipper Form is Not Visible!')
            .click(Selector('#courier'))
            .click(Selector('#courier > option').withText(name))
            .click(Selector('#courier_rate'))
            .click(Selector('#courier_rate > option:nth-child(2)'))
            .click(Selector('#shipper_insurance'))
            .click(Selector('#shipper_insurance > option'));
        //this.detailTransactionList.push(arr[0],arr[3])
        //[courier, rate, insurance, this.ratePrice, this.insurancePrice]
        this.shippingName = name;
        let rate = await Selector('#courier_rate > option:nth-child(2)').textContent;
        this.shippingRate = parseInt(rate.slice(rate.indexOf('IDR')+3));
        //console.log(this.shippingRate)
    }
    /*
    1. get courierList
    2. get PaymentMethodList
    */
    async getCourierList(){
        if (await Selector('#shipper_area').exists){
            let courier;
            let rate;
            let insurance;
    
            let courierSel = Selector('#courier > option:nth-child(2)');
            while (await courierSel.exists){
                await t
                    .click(Selector('#courier'))
                    .click(courierSel);
                courier = await courierSel.textContent;
    
                await t
                    .click(Selector('#courier_rate'))
                    .expect(Selector('#courier_rate > option:nth-child(2)').exists).ok('Rate unavailable!')
                    .click(Selector('#courier_rate > option:nth-child(2)'));
                rate = await Selector('#courier_rate > option:nth-child(2)').textContent;
                this.ratePrice = parseInt(rate.slice(rate.indexOf('IDR')+3));
                let chooseInsurance = Selector('#shipper_insurance > option')
                while (await chooseInsurance.nextSibling().exists){
                    chooseInsurance = chooseInsurance.nextSibling();
                }
                await t
                    .click(Selector('#shipper_insurance'))
                    .expect(Selector('#shipper_insurance > option').exists).ok('Insurance unavailable!')
                    .click(Selector(chooseInsurance));
                insurance = await Selector(chooseInsurance).textContent;
                this.insurancePrice = parseInt(insurance.slice(8,12));
                
                this.courierData.push([courier, rate, insurance, this.ratePrice, this.insurancePrice]);
                courierSel =  courierSel.nextSibling();
            }
        }
        return this.courierData;
    }
    async getPaymentMethodList(){
        let i = 3;
        let paymentSelect = Selector(`#paymentMethod > div.styled-select-payment-wrap.clearfix.paymentOptionND > div > label:nth-child(${i})`);
        while (await paymentSelect.exists){
            this.paymentMethodData.push([paymentSelect,(await paymentSelect.textContent).replace(/^\s+|\s+$/gm,'')]);
            i++;
            paymentSelect = Selector(`#paymentMethod > div.styled-select-payment-wrap.clearfix.paymentOptionND > div > label:nth-child(${i})`);
        }
        i = 13;
        paymentSelect = Selector(`#paymentMethod > div.styled-select-payment-wrap.clearfix.paymentOptionND > div > label:nth-child(${i})`);
        while (await paymentSelect.exists){
            this.paymentMethodData.push([paymentSelect,(await paymentSelect.textContent).replace(/^\s+|\s+$/gm,'')]);
            i++;
            paymentSelect = Selector(`#paymentMethod > div.styled-select-payment-wrap.clearfix.paymentOptionND > div > label:nth-child(${i})`);
        }
        paymentSelect = Selector('#paymentMethod > div.styled-select-payment-wrap.clearfix.paymentOptionND > div > label:nth-child(17)');
        this.paymentMethodData.push([paymentSelect,(await paymentSelect.textContent).replace(/^\s+|\s+$/gm,'')]);
        return this.paymentMethodData;
    }
    async assertFillCheckout_ConfrimPayment(ss){
        await t
            .hover(Selector('#confirmPayFinal > td'))
            .takeScreenshot(ss);
        this.subtotal = parseInt((await Selector('#confirmPayFinal > td > div.totalPay.clearfix > div.subTotalPay > span:nth-child(2)').textContent).replace(/^\s+|\s+$/gm,'').replace(/\./g,'').slice(4));
        this.disc = parseInt((await Selector('#confirmPayFinal > td > div.totalPay.clearfix > div.taxPay > span:nth-child(2)').textContent).replace(/^\s+|\s+$/gm,'').replace(/\./g,'').slice(6));
        this.tax = parseInt((await Selector('#confirmPayFinal > td > div.totalPay.clearfix > div:nth-child(3) > span:nth-child(2)').textContent).replace(/^\s+|\s+$/gm,'').replace(/\./g,'').slice(4));
        this.shippingRate2 = parseInt((await Selector('#confirmPayFinal > td > div.totalPay.clearfix > div:nth-child(4) > span:nth-child(2)').textContent).replace(/^\s+|\s+$/gm,'').replace(/\./g,'').slice(4));
        this.shippingInsurance = parseInt((await Selector('#confirmPayFinal > td > div.totalPay.clearfix > div.shippingRateInsurance > span:nth-child(2)').textContent).replace(/^\s+|\s+$/gm,'').replace(/\./g,'').slice(4));
        this.total = parseInt((await Selector('#confirmPayFinal > td > div.totalPay.clearfix > div.totalPay > span:nth-child(2)').textContent).replace(/^\s+|\s+$/gm,'').replace(/\./g,'').slice(4));
        
        let subtotalArr = this.itemPrice*this.itemQty;

        this.dataTransaction_WebStore.push([this.itemName,this.itemPrice,
            this.itemSize, this.itemQty,
            this.shippingName, this.shippingRate,
            this.subtotal, this.shippingRate2,
            this.shippingInsurance, this.tax,
            this.disc, this.total
            ]);
        await t
            .expect(this.subtotal).eql(subtotalArr,`Different subtotal from item array!\nSub-Total: ${this.subtotal}\nSub-Total Arr: ${subtotalArr}`)
            .expect(this.shippingRate2).eql(this.shippingRate,`Different price between shipping rate in shipping area and confirm payment!\nShipping Rate: ${this.shippingRate2}\nEQL Shipping Rate: ${this.shippingRate}`)
            .expect(this.total).eql(this.subtotal+this.tax+this.shippingRate2+this.shippingInsurance-this.disc,`Total is wrong!\nTotal: ${this.total}\nEQL Total: ${this.subtotal+this.tax+this.shippingRate+this.shippingInsurance-this.disc}`);
        //this.detailTransactionList.push(subtotal,shippingRate,shippingInsurance,tax,disc,total);
    }
    async fillCheckout_ConfrimPayment(name,ss){
        await this.assertFillCheckout_ConfrimPayment(ss);
        let arr = await this.getPaymentMethodList();
        let paymentSel;
        for (let i=0;i<arr.length;i++){
            if (arr[i][1].includes(name)){
                paymentSel = arr[i][0];
                break;
            }
        }
        await t
            .click(paymentSel);
    }
    
}

export default new AdidasPageVer2();