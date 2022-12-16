import axios from 'axios'
export default async function postmember(req, res) {
	const mailchimp = await axios.post(process.env.VUE_APP_MAIL_CHIMP_API_BASE + 'lists/' + process.env.VUE_APP_MAIL_CHIMP_LIST + '/members', { "email_address": req.query.email, "email_type": "", "status": "subscribed", "merge_fields": {}, "interests": {}, "language": "", "vip": false, "location": { "latitude": 0, "longitude": 0 }, "marketing_permissions": [], "ip_signup": "", "timestamp_signup": "", "ip_opt": "", "timestamp_opt": "", "tags": [] }, {
    headers:{
      'Authorization' : 'Bearer ' + process.env.VUE_APP_MAIL_CHIMP_BEARER
    }
  })
		.then(result => result.data)

  return res.send(mailchimp);
}
