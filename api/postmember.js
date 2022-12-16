import axios from 'axios'
export default async function postmember(req, res) {
	const mailchimp = await axios.post(process.env.VUE_APP_MAIL_CHIMP_API_BASE + 'lists/' + process.env.VUE_APP_MAIL_CHIMP_LIST + '/members?skip_merge_validation=false', {
		'email_address': req.query.email,
		'status': 'subscribed'
	}, {
    headers:{
      'Authorization' : 'Bearer ' + process.env.VUE_APP_MAIL_CHIMP_BEARER
    }
  })
		.then(result => result.data)

  return res.send(mailchimp);
}
