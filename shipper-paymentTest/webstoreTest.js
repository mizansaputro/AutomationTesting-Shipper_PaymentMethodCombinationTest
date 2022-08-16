import { ClientFunction, Selector } from 'testcafe';
import AdidasPageVer2 from '../Pages/AdidasPageVer2';



fixture`Testing Shipping & Payment Method Combination`
    .page('https://adidasindonesiaqa.avana.asia/');
    
for (let i=0;i<AdidasPageVer2.courierList.length;i++){
    for (let j=0;j<AdidasPageVer2.paymentMethodList.length;j++){
        test(`Courier ${AdidasPageVer2.courierList[i]} Payment ${AdidasPageVer2.paymentMethodList[j]}`, async t => {
            await t
                .setTestSpeed(0.5)
                .takeScreenshot(`Webstore-Shipper-PaymentMethod/${j+1}\. Webstore - Shipper ${AdidasPageVer2.courierList[i]} With Payment Method ${AdidasPageVer2.paymentMethodList[j]}/1\. main-page`);
            await AdidasPageVer2.selectItem("adidas Originals NMD_V3");
            await AdidasPageVer2.fillDetailItemPage(41,2);
            await t
                .takeScreenshot(`Webstore-Shipper-PaymentMethod/${j+1}\. Webstore - Shipper ${AdidasPageVer2.courierList[i]} With Payment Method ${AdidasPageVer2.paymentMethodList[j]}/2\. Detail-page`);
            await t
                .click(AdidasPageVer2.checkout_btn);
            await AdidasPageVer2.fillCheckout_ConfirmOrder('avana123');
            await t
                .takeScreenshot(`Webstore-Shipper-PaymentMethod/${j+1}\. Webstore - Shipper ${AdidasPageVer2.courierList[i]} With Payment Method ${AdidasPageVer2.paymentMethodList[j]}/3\. ConfirmOrder-page`);
            await t
                .click(AdidasPageVer2.checkout_proceed_btn);
            await AdidasPageVer2.fillCheckout_ShippingAddress_BillingAddress();
            await t
                .takeScreenshot(`Webstore-Shipper-PaymentMethod/${j+1}\. Webstore - Shipper ${AdidasPageVer2.courierList[i]} With Payment Method ${AdidasPageVer2.paymentMethodList[j]}/4\. ShippingAddress-page-BillingAddress`);
            await AdidasPageVer2.fillCheckout_ShippingAddress_Shipper(AdidasPageVer2.courierList[i])
            await t
                .takeScreenshot(`Webstore-Shipper-PaymentMethod/${j+1}\. Webstore - Shipper ${AdidasPageVer2.courierList[i]} With Payment Method ${AdidasPageVer2.paymentMethodList[j]}/5\. ShippingAddress-page-Shipper`);
            await t
                .click(AdidasPageVer2.checkout_proceed_btn);
            await AdidasPageVer2.fillCheckout_ConfrimPayment(AdidasPageVer2.paymentMethodList[j],`Webstore-Shipper-PaymentMethod/${j+1}\. Webstore - Shipper ${AdidasPageVer2.courierList[i]} With Payment Method ${AdidasPageVer2.paymentMethodList[j]}/6\. ConfirmPayment-page-detailTransaction`);
            await t
                .takeScreenshot(`Webstore-Shipper-PaymentMethod/${j+1}\. Webstore - Shipper ${AdidasPageVer2.courierList[i]} With Payment Method ${AdidasPageVer2.paymentMethodList[j]}/7\. ConfirmPayment-page-detailPaymentMethod`)
                .click(AdidasPageVer2.checkout_proceed_btn)
                .takeScreenshot(`Webstore-Shipper-PaymentMethod/${j+1}\. Webstore - Shipper ${AdidasPageVer2.courierList[i]} With Payment Method ${AdidasPageVer2.paymentMethodList[j]}/8\. ${AdidasPageVer2.paymentMethodList[j]}-page`);  
        });
    }
}