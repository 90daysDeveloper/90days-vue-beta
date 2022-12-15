import axios from 'axios'
export default async function handler(req, res) {

  console.log('sto chiamando mail chimp')
  const mailchimp = await axios.get(process.env.VUE_APP_MAIL_CHIMP_API_BASE + req.query, {
    headers:{
      'Authorization' : 'Bearer ' + process.env.VUE_APP_MAIL_CHIMP_BEARER
    }
  })
  .then(result => result)
  .finally(()=> console.log('sono uscito da mailchimp'))


  return res.send(mailchimp);
}
