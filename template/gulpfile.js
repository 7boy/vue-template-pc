/**
 * Created by 7coder on 2017/12/14.
 */

const APPNAME = ''

const path = require('path')
const gulp = require('gulp')
// 图片压缩
// sftp上传
const scp = require('gulp-scp2')
// 把gulp的任务当作同步处理
const sequence = require('gulp-sequence')

const DIST_PATH = path.resolve(__dirname, './dist/')

gulp.task('deploy', () => {
  let dest = `/data/deploy/${APPNAME}`
  return gulp.src(path.join(DIST_PATH, '\**'))
    .pipe(scp({
      host: '47.98.124.158',
      username: 'oper',
      password: '',
      port: 22,
      dest: dest,
      watch: client => {
        client.on('write', o => {
          console.log(`正在上传文件:${o.destination}`)
        });
      }
    }))
    .on('error', err => {
      console.log(err)
    })
})

gulp.task('default', sequence('deployS',() => {
  console.log('上传完成')
}))
