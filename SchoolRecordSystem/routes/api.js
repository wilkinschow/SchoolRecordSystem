var express = require('express')
var router = express.Router()

//Endpoint: POST /api/register
router.post('/register', (req, res)=>{
  const sql_t = 'insert ignore into Registers (email_t, email_s) values ("' + req.body.teacher + '", '
  var sql_reg = ''
  req.body.students.forEach((item) => {
    console.log(item)
    sql_reg += sql_t + '"' + item + '");'
  })

  connection.query(sql_reg, null, (err)=>{
    if(err) res.status(500).send(JSON.stringify({'message': 'Failed to register. Please check input body.'}))
    else res.status(204).send()
  })
})

//Endpoint: GET /api/commonstudents
router.get('/commonstudents', (req, res)=>{
  var email_t = req.query.teacher
  var sql_cs = 'select email_s from Registers where email_t in (?) group by email_s having count(distinct email_t) = ' + email_t.length

  connection.query(sql_cs, [email_t], (err, results)=>{
    if(err) res.status(500).send(JSON.stringify({'message': 'Failed to retrieve students. Please check input body.'}))
    else {
      var cs = []
      results.forEach((item)=>{ cs.push(item.email_s)})
      res.status(200).send(JSON.stringify({'students': cs}))
    }
  })
})

//Endpoint: POST /api/suspend
router.post('/suspend', (req, res)=>{
  var sql_sus = 'update Students set suspended = true where email_s = ("' + req.body.student + '");'

  connection.query(sql_sus, null, (err)=>{
    if(err) res.status(500).send(JSON.stringify({'message': 'Failed to process suspension. Please check input body.'}))
    else res.status(204).send()
  })
})

//Endpoint: POST /api/retrievefornotifications
router.post('/retrievefornotifications', (req, res)=>{
  var sql_rn = 
    'select email_s from Registers where email_t = "' + req.body.teacher + '" ' + 
    'union ' +
    'select email_s from Students where email_s in ? and suspended = false'
  const emailRegex = /@\S+@\S+/g
  var mentions = req.body.notification.match(emailRegex)
  var students = []
  if(mentions) mentions.forEach((mention) => { students.push(mention.substring(1)) })
  
  connection.query(sql_rn, [[students]], (err, results)=>{
    if(err) res.status(500).send(JSON.stringify({'message': 'Failed to retrieve students. Please check input body.'}))
    else {
      var recipients = []
      results.forEach((item)=>{ recipients.push(item.email_s) })
      res.status(200).send(JSON.stringify({'recipients': recipients}))
    }
  })
})

module.exports = router
