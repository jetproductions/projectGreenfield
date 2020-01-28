// API call GET /reviews/:product_id/list

let randomArr = [...new Array(4)].map(el => Math.random());
let reviewListP1 = {
		"product": "1",
		"page": 0,
		"count": 5,
		"results": [
				{
						"review_id": 57504,
						"rating": 1,
						"summary": "I saw justin kick an old man on the street",
						"recommend": 0,
						"response": null,
						"body": "It was awful i told him to stop but he just laughed",
						"date": "2019-12-18T00:00:00.000Z",
						"reviewer_name": "c3po",
						"helpfulness": 8,
						"photos": []
				},
				{
						"review_id": 57509,
						"rating": 5,
						"summary": "I recommend",
						"recommend": 1,
						"response": null,
						"body": "I recommend this product because my dog bought it for me",
						"date": "2019-12-19T00:00:00.000Z",
						"reviewer_name": "Dustin22",
						"helpfulness": 0,
						"photos": []
				},
				{
						"review_id": 57512,
						"rating": 2,
						"summary": "Could be better",
						"recommend": 0,
						"response": null,
						"body": "It was really very good but actually could be better.",
						"date": "2019-12-19T00:00:00.000Z",
						"reviewer_name": "Dustin22",
						"helpfulness": 0,
						"photos": []
				},
				{
						"review_id": 57517,
						"rating": 5,
						"summary": "this is only ok",
						"recommend": 0,
						"response": null,
						"body": "yeah i wthought it was only ok, i need to write more to submit this",
						"date": "2019-12-19T00:00:00.000Z",
						"reviewer_name": "E",
						"helpfulness": 0,
						"photos": [
								{
										"id": 27134,
										"url": `https://source.unsplash.com/random/800x600?v=${randomArr[0]}`
								},
								{
										"id": 27135,
										"url": `https://source.unsplash.com/random/800x600?v=${randomArr[1]}`
								},
								{
										"id": 27136,
										"url": `https://source.unsplash.com/random/800x600?v=${randomArr[2]}`
								},
								{
										"id": 27137,
										"url": `https://source.unsplash.com/random/800x600?v=${randomArr[3]}`
								}
						]
				}
		]
}

export default reviewListP1;