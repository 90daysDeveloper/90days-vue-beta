import axios from 'axios'
export default async function handler(req, res, email) {
  console.log('sto chiamando mail chimp')
	const mailchimp = await axios.get(process.env.VUE_APP_MAIL_CHIMP_API_BASE + 'search-members?query=' + email + '&list_id=' + process.env.VUE_APP_MAIL_CHIMP_LIST, {
    headers:{
      'Authorization' : 'Bearer ' + process.env.VUE_APP_MAIL_CHIMP_BEARER
    }
  })
		.then(result => result.data)
		.finally(()=> console.log('sono uscito da mailchimp'))

  return res.send(mailchimp);
}
