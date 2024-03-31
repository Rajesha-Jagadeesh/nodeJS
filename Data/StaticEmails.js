
export const getRegisterEmailContents = (fullname, email, href, verifyURL)=>{
    const registerEmail = {
      subject: "Thank you for registring",
      mailHtml: `<style> body, html { margin: 0; padding: 0; }  body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; } .container { max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); }  .header { text-align: center; margin-bottom: 20px; } .content { text-align: center; margin-bottom: 20px; }  .button { display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 3px; }  .footer { text-align: center; color: #777; } </style>  <div class="container"> <div style="padding: 20px"> <h3>Hello, ${fullname} </h3> </div> <div class="header"> <h1>Thank You for Registering!</h1> </div> <div class="content"> <p>We are excited to have you join us. Get ready to discover amazing products and great offers!</p> <a href="https://easy-shopping-sandbox.web.app/" class="button">Start Shopping</a> </div> <br> <div class="content"> <p>Plase verify the account using below button</p> <a href="${verifyURL}" class="button">verify</a> </div> <div class="footer"> <p>If you have any questions, feel free to <a href="https://easy-shopping-sandbox.web.app/contact-us">contact us</a>.</p> </div> </div>`
    }

    return registerEmail;
}