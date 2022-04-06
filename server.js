const express = require('express')
const app = express()
const nunjucks = require('nunjucks')
const pool = require('./db')

app.set('view engine','html')
nunjucks.configure('views',{
    express:app,
    watch:true,
})

app.use(express.urlencoded({extended:true,}))

app.get('/',(req,res)=>{
    res.render('index.html')
})

app.get('/board/list', async (req,res)=>{
    try {
        const sql = `SELECT idx,subject,writer,DATE_FORMAT(register_date,'%Y-%m-%d') as date,hit FROM board ORDER BY idx DESC`;
        const [result] = await pool.query(sql)
        res.render('board/list.html',{
            result
        })
    } catch (e) {
        console.log(e)
    }
})

app.get('/board/view/:idx',async (req,res)=>{
    try {
        const {idx} = req.params
        const sql = `SELECT idx,subject,writer,DATE_FORMAT(register_date,'%Y-%m-%d') as date,content FROM board WHERE idx=?`
        const prepare = [idx]
        const [[result]] = await pool.query(sql,prepare)

        res.render('board/view.html',{
            result
        })
    } catch (e) {
        console.log(e.message)
    }

})

app.get('/board/write', (req,res)=>{
    res.render('board/write')
})

app.get('/board/modify/:idx',async (req,res)=>{
    try {
        const {idx} = req.params
        const sql = `SELECT idx,subject,writer,DATE_FORMAT(register_date,'%Y-%m-%d') as date,content FROM board WHERE idx=?`
        const prepare = [idx]
        const [[result]] = await pool.query(sql,prepare)

        res.render('board/modify',{
            result
        })
    } catch (e) {

    }
})

/* post 부분 */
app.post('/board/write',async (req,res)=>{
    try {
        const {writer,subject,content} = req.body

        const sql = `INSERT INTO board(subject,writer,content) values(?,?,?)`
        const prepare = [writer,subject,content]

        const [result] = await pool.query(sql,prepare)
        res.redirect(`/board/view/${result.insertId}`)    
    } catch (e) {
        console.log(e.message)
        res.redirect('/board/list')
    }

})

app.post('/board/modify',async (req,res)=>{
    try {
        const { idx,writer,subject,content } = req.body

        const sql = `UPDATE board SET subject=?,writer=?,content=? where idx=?`
        const prepare = [subject,writer,content,idx]

        const [result] = await pool.query(sql,prepare)

        res.redirect(`/board/view/${idx}`)
    } catch (e) {
        console.log(e.message)
        res.redirect(`/board/list`)
    }
})

app.post('/board/delete',async (req,res)=>{
    try {
        console.log('?')
        console.log(req.body)
        const { idx } = req.body
        console.log(idx)
        const sql = `DELETE FROM board WHERE idx=?`
        const prepare = [idx]

        const [result] = await pool.query(sql,prepare)
        res.redirect(`/board/list`)
    } catch (e) {
        console.log(e.message)
        res.redirect(`/board/list`)
    }
})

app.listen(3000,()=>{
    console.log('server start')
})