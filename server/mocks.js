var Mocks = {
  init: function(app) {
    app.post('/SRA/authenticate', function(req, res) {
      res.send( {
        "code":0,
        "message":"Login Successful",
        "sessionId":"75984292-af89-4280-8aac-7f15b4e3a1ba",
        "data":{
          "username":"john.doe",
          "firstname":"John",
          "lastname":"Doe"
        }});
    });

    app.post('/SRA/logout', function(req, res) {
      res.send({
        "code":0,
        "message":"Logout Successful",
        "sessionId":null,
        "data":null
      });
    });

    app.post('/SRA/customer/list', function(req, res) {
      res.send({
        "code":0,
        "message":"Successfully",
        "sessionId": "75984292-af89-4280-8aac-7f15b4e3a1ba",
        "data":[{
          "id":36,
          "customername":"Amul",
          "productname":"Sorting Machine",
          "status":"New1",
          "notes":"Testing",
          "username":"john.doe"
        },{
          "id":37,
          "customername":"Biltmore Global Superstore",
          "productname":"Color Swatch",
          "status":"InProgress",
          "notes":"Auth Testing",
          "username":"john.doe"
        },{
          "id":38,
          "customername":"Arrow",
          "productname":"Aimpoint 9000SC",
          "status":"OrderPlaced",
          "notes":null,
          "username":"john.doe"
        },{
          "id":39,
          "customername":"Promotional Shop",
          "productname":"Aimpoint CompC3",
          "status":"Support",
          "notes":null,
          "username":"john.doe"
        },{
          "id":40,
          "customername":"The Smooth Mover",
          "productname":"Barska 6-24x50",
          "status":"Rejected",
          "notes":null,
          "username":"john.doe"
        },{
          "id":41,
          "customername":"Karioi Clinic",
          "productname":"BSA 3-9x50",
          "status":"New",
          "notes":null,
          "username":"john.doe"
        },{
          "id":42,
          "customername":"Property Net",
          "productname":"Fullfield DAC",
          "status":"InProgress",
          "notes":null,
          "username":"john.doe"
        }]});
    });

    app.post('/SRA/customer/details', function(req, res) {
      res.send({
        "code":0,
        "message":"Successfully",
        "sessionId": "75984292-af89-4280-8aac-7f15b4e3a1ba",
        "data":
        {
          "id":36,
          "customername":"Amul",
          "productname":"Sorting Machine",
          "status":"New",
          "notes":"Testing",
          "username":"john.doe",
          "addresses":[{
            "id":22,
            "type":"Office",
            "street1":"Suite 315",
            "street2":null,
            "city":"North brunswick",
            "state":"New Jersey",
            "country":"US",
            "pincode":7678}],
          "communications":[{
            "id":88,
            "category":"Phone",
            "type":"Other",
            "value":"4567091239"
          },{
            "id":86,
            "category":"Skype",
            "type":"Skype",
            "value":"amul.contact"
          },{
            "id":87,
            "category":"Email",
            "type":"Office",
            "value":"sales@amul.com"
          },{
            "id":85,
            "category":"Phone",
            "type":"Office",
            "value":"9876543210"
          }],
          "visit":{
            "id":2,
            "date":1431196200000,
            "time":"09:00 AM",
            "action":"Opportunity",
            "notes":"Testing save visit"
          }}});
    });

    app.post('/SRA/customer/savenotes', function(req, res) {
      res.send({
        "code":0,
        "message":"Successfully",
        "sessionId": "75984292-af89-4280-8aac-7f15b4e3a1ba",
        "data":{
          "id":36,
          "customername":"Amul",
          "productname":"Sorting Machine",
          "status":"InProgress",
          "notes":"Final Test",
          "username":"john.doe",
          "addresses":[{
            "id":22,
            "type":"Office",
            "street1":"Suite 315",
            "street2":null,
            "city":"North brunswick",
            "state":"New Jersey",
            "country":"US",
            "pincode":7678
          }],
          "communications":[{
            "id":86,
            "category":"Skype",
            "type":"Skype",
            "value":"amul.contact"
          },{
            "id":87,
            "category":"Email",
            "type":"Office",
            "value":"sales@amul.com"
          },{
            "id":88,
            "category":"Phone",
            "type":"Other",
            "value":"4567091239"
          },{
            "id":85,
            "category":"Phone",
            "type":"Office",
            "value":"9876543210"
          }],
          "visit":{
            "id":2,
            "date":1433529000000,
            "time":"3:30 PM",
            "action":"Lead",
            "notes":"Testing session management"
          }}});
    });

    app.post('/SRA/customer/savevisit', function(req, res) {
      res.send({
        "code":0,
        "message":"Successfully",
        "sessionId": "75984292-af89-4280-8aac-7f15b4e3a1ba",
        "data":{
          "id":36,
          "customername":"Amul",
          "productname":"Sorting Machine",
          "status":"InProgress",
          "notes":"Final Test",
          "username":"john.doe",
          "addresses":[{
            "id":22,
            "type":"Office",
            "street1":"Suite 315",
            "street2":null,
            "city":"North brunswick",
            "state":"New Jersey",
            "country":"US",
            "pincode":7678
          }],
          "communications":[{
            "id":88,
            "category":"Phone",
            "type":"Other",
            "value":"4567091239"
          },{
            "id":87,
            "category":"Email",
            "type":"Office",
            "value":"sales@amul.com"
          },{
            "id":85,
            "category":"Phone",
            "type":"Office",
            "value":"9876543210"
          },{
            "id":86,
            "category":"Skype",
            "type":"Skype",
            "value":"amul.contact"
          }],
          "visit":{
            "id":2,
            "date":1433529000000,
            "time":"3:30 PM",
            "action":"Lead",
            "notes":"Testing session management"
          }}});
    });
  }
};

module.exports = Mocks;
