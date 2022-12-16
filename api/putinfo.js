import axios from 'axios'
export default async function putInfo(req, res) {
	const mailchimp = await axios.put(process.env.VUE_APP_MAIL_CHIMP_API_BASE + 'lists/' + process.env.VUE_APP_MAIL_CHIMP_LIST + '/members/' + req.query.id, {
		"merge_fields": {
			"FNAME": req.query.fname,
			"LNAME": req.query.lname
		}
	}, {
    headers:{
      'Authorization' : 'Bearer ' + process.env.VUE_APP_MAIL_CHIMP_BEARER
    }
  })
		.then(result => result.data)

  return res.send(mailchimp);
}
