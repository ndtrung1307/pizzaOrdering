

function addProductDetail (productDetailData) {
    let temporaryPrice = productDetailData.unitPrice.price;
    let productName = productDetailData.product.name;

    if (productDetailData.unitPrice.size !== null && productDetailData.unitPrice.size !== undefined) {
        productName = productName + '<br>' + productDetailData.unitPrice.size;
    }

    if (productDetailData.options.length > 0) {
        productDetailData.options.forEach(element => {
            productName = productName + '<br>' + element.name;
            temporaryPrice += element.price;
        });
    }

    return '<tbody bgcolor="#eee" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#444;line-height:18px"><tr><td align="left" valign="top" style="padding:3px 9px"><strong>' + productName + '</strong></td><td align="left" valign="top" style="padding:3px 9px"><span>' + temporaryPrice + '&nbsp;₫</span></td><td align="left" valign="top" style="padding:3px 9px">' + productDetailData.quantity + '</td><td align="left" valign="top" style="padding:3px 9px"><span>0,00&nbsp;₫</span></td><td align="right" valign="top" style="padding:3px 9px"><span>'+(temporaryPrice * productDetailData.quantity)+'&nbsp;₫</span></td></tr></tbody>';
}

module.exports.generateOrderEmail = (data) => {

    let userName = data.user.firstname + ' ' + data.user.lastname;

    var htmlOrderFormat = '';
    htmlOrderFormat += '<table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#dcf0f8" style="margin:0;padding:0;background-color:#f2f2f2;width:100%!important;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#444;line-height:18px"><tbody><tr><td align="center" valign="top" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#444;line-height:18px;font-weight:normal">';
    htmlOrderFormat += '<table border="0" cellpadding="0" cellspacing="0" width="600" bgcolor="#fff" style="margin-top:15px">';
    htmlOrderFormat += '<tbody>';
    htmlOrderFormat += '<tr style="background:#fff">';
    htmlOrderFormat += '<td align="left" width="600" height="auto" style="padding:15px">';
    htmlOrderFormat += '<table>';
    htmlOrderFormat += '<tbody>';
    htmlOrderFormat += '<tr>';
    htmlOrderFormat += '<td>';
    htmlOrderFormat += '<h1 style = "font-size:14px;font-weight:bold;color:#444;padding:0 0 5px 0;margin:0" > The order is ready for delivery to you, '+data.name+'! </h1>';
    htmlOrderFormat += '<p style="margin:4px 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#444;line-height:18px;font-weight:normal">We have just delivered your order to the shipping partner.</p>';
    htmlOrderFormat += '<h3 style="font-size:13px;font-weight:bold;color:#02acea;text-transform:uppercase;margin:20px 0 0 0;border-bottom:1px solid #ddd">Order\'s Information #' + data._id + ' <span style="font-size:12px;color:#777;text-transform:none;font-weight:normal">( ' + data.creationDate + ' )</span> </h3>';
    htmlOrderFormat += '<tr></tr>';
    htmlOrderFormat += '<tr><td style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#444;line-height:18px">';
    
    htmlOrderFormat += '<table cellspacing="0" cellpadding="0" border="0" width="100%">';
    htmlOrderFormat += '<thead><tr><th align="left" width="50%" style="padding:6px 9px 0px 9px;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#444;font-weight:bold">Customer Information</th><th align="left" width="50%" style="padding:6px 9px 0px 9px;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#444;font-weight:bold">Order Method</th></tr></thead>';
    htmlOrderFormat += '<tbody><tr><td valign="top" style="padding:3px 9px 9px 9px;border-top:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#444;line-height:18px;font-weight:normal"><span style="text-transform:capitalize">' + userName + '</span><br>' + data.user.phone + '<br>Payment Method: '+data.payment.type+'</td>';
    
    switch (data.orderMethod) {
        case 'CARRYOUT':
            htmlOrderFormat += '<td valign="top" style="padding:3px 9px 9px 9px;border-top:0;border-left:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#444;line-height:18px;font-weight:normal"> <strong>Method:</strong> Carry Out<br> <strong>Store Address: </strong><br>' + data.shippingAddress.houseNumber + ', ' + data.shippingAddress.street + ' street,<br>' + data.shippingAddress.dictrict + ', ' + data.shippingAddress.province + ',<br> Viet Nam</td></tr></tbody>';
            break;
        case 'DELIVERY':
            htmlOrderFormat += '<td valign="top" style="padding:3px 9px 9px 9px;border-top:0;border-left:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#444;line-height:18px;font-weight:normal"> <strong>Method:</strong> Delivery<br>' + data.name + '<br>' + data.shippingAddress.houseNumber + ', ' + data.shippingAddress.street + ' street<br>' + data.shippingAddress.dictrict + ', ' + data.shippingAddress.province + ',<br> Viet Nam<br> Tell: ' + data.phone + '</td></tr></tbody>';
            break;

        default:
            break;
    }
    htmlOrderFormat += '</table></td></tr>';

    htmlOrderFormat += '<tr><td><h2 style="text-align:left;margin:10px 0;border-bottom:1px solid #ddd;padding-bottom:5px;font-size:13px;color:#02acea">Order Detail</h2><table cellspacing = "0" cellpadding = "0" border = "0" width = "100%" style = "background:#f5f5f5" ><thead><tr><th align="left" bgcolor="#02acea" style="padding:6px 9px;color:#fff;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:14px">Product</th><th align="left" bgcolor="#02acea" style="padding:6px 9px;color:#fff;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:14px">Unit Price</th><th align="left" bgcolor="#02acea" style="padding:6px 9px;color:#fff;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:14px">Quantity</th><th align="left" bgcolor="#02acea" style="padding:6px 9px;color:#fff;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:14px">Discount</th><th align="right" bgcolor="#02acea" style="padding:6px 9px;color:#fff;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:14px">Temporary Total</th></tr></thead>';
    
    data.orderLines.forEach(element => {
        let tmp = addProductDetail(element);
        htmlOrderFormat += tmp;
        htmlOrderFormat += '<tbody style ="padding-top: 2px" bgcolor="#fff"></tbody>';
    });
    htmlOrderFormat += '<tfoot style="font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#444;line-height:18px"> <tr><td colspan = "4" align = "right" style = "padding:5px 9px" > Temporary total amount </td> <td align = "right" style = "padding:5px 9px"> <span> '+data.orderTotal+' &nbsp;₫ </span></td></tr> <tr><td colspan = "4" align = "right" style = "padding:5px 9px" > Discount </td> <td align = "right" style = "padding:5px 9px"><span> 0, 00 &nbsp;₫ </span></td></tr> <tr><td colspan = "4" align = "right" style = "padding:5px 9px"> Shipping fee </td> <td align = "right" style = "padding:5px 9px"> <span> 0, 00 &nbsp;₫ </span></td></tr> <tr bgcolor = "#eee" ><td colspan = "4" align = "right" style = "padding:7px 9px"> <strong> <big> Total Amount Of Order </big></strong ></td> <td align = "right" style = "padding:7px 9px"> <strong> <big> <span> '+data.orderTotal+', 00 &nbsp;₫ </span></big> </strong></td></tr></tfoot>';

    htmlOrderFormat += '</table></td></tr>';
    
    htmlOrderFormat += '</tbody></table></td></tr></tbody></table>';
    htmlOrderFormat += '</td></tr></tbody></table>';
    // console.log(htmlOrderFormat);
    
    return htmlOrderFormat;
};

