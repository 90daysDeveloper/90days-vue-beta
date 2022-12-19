import axios from 'axios'
export default async function getid(req, res) {
	const mailchimp = await axios.get(process.env.VUE_APP_MAIL_CHIMP_API_BASE + 'search-members?query=' + req.query.email + '&list_id=' + process.env.VUE_APP_MAIL_CHIMP_LIST, {
    headers:{
      'Authorization' : 'Bearer ' + process.env.VUE_APP_MAIL_CHIMP_BEARER
    }
  })
		.then(result => result.data)

  return res.send(mailchimp);
}
