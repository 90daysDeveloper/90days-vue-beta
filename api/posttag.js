import axios from 'axios'
export default async function posttag(req, res) {
	const mailchimp = await axios.post(process.env.VUE_APP_MAIL_CHIMP_API_BASE + 'lists/' + process.env.VUE_APP_MAIL_CHIMP_LIST + '/members/' + req.query.id + '/tags', {
		"tags": [
			{
				"name": req.query.tag,
				"status": "active"
			}
		]
	}, {
    headers:{
      'Authorization' : 'Bearer ' + process.env.VUE_APP_MAIL_CHIMP_BEARER
    }
  })
		.then(result => result.data)

  return res.send(mailchimp);
}
