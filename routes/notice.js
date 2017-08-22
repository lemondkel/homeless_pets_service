var express = require('express');
var router = express.Router();
var request = require("request");
// var json = require('json');
var xml2js = require('xml2js');
var parser = xml2js.Parser();

var hostName = 'http://openapi.animal.go.kr';
var api = '/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic';
var key = 'vWrQTRp%2BZF8PWf6%2Fi3p6XjJJHJNmwnRzwW2gXYw5b5EI%2FCI58nwenZ%2FRYz%2FDEyjjC2IkZ%2BtTvdechGz%2FCJeHqg%3D%3D';
var bgnde = '20170822'; //시작일
var endde = '20170822'; //종료일
var state = 'notice'; //공고중인지 보호중인지 여부
var pageNo; //페이지번호
var startPage = '1'; //시작페이지
var numOfRows = '5'; //페이지당 아이템수
var pageSize = '5'; //페이지크기

router.post('/', function (req, response) {
	req.accepts('application/json');

	if(req.param('pageNo') === undefined) {
		pageNo = 1;
	} else {
		pageNo = req.param('pageNo');
	}

	request({
		url: hostName + api + '?serviceKey=' + key + "&bgnde=" + bgnde + '&endde' + endde + "&state=" + state + "&pageNo="
		+ pageNo + '&startPage=' + startPage + '&numOfRows=' + numOfRows + '&pageSize=' + pageSize,
		method: "GET",
		dataType: "json"
	}, function (error, response2, body) {

		var response_items;
		var response_numOfRows;
		var response_pageNo;
		var response_totalCount;

		parser.parseString(body, function (err, result) {
			// console.log(JSON.stringify(result.response.body[0].items[0]));
			console.log(result.response.body[0]);

			response_items = result.response.body[0].items[0];
			response_numOfRows = result.response.body[0].numOfRows[0];
			response_pageNo = result.response.body[0].pageNo[0];
			response_totalCount = result.response.body[0].totalCount[0];

			response.json({
				data: {
					items: response_items,
					numOfRows: response_numOfRows,
					pageNo: response_pageNo,
					totalCount: response_totalCount
				}
			});
		});
	});

	// input message handling
	// json = request.body;
	// console.log('name is :'+json.name);
	// console.log('address is :'+json.address);

});

module.exports = router;
