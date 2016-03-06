import gulp from 'gulp';
import shell from 'gulp-shell';
import rimraf from 'rimraf';
import run from 'run-sequence';
import watch from 'gulp-watch';
import server from 'gulp-live-server';

const paths = {
  js :['./src/**/*.js'],
  destination: './app'
};

gulp.task('default', cb => {
  run('server', 'build', 'watch', cb);
});

gulp.task('build', cb => {
  run('clean','babel','restart',cb);
});

gulp.task('clean', cb => {
  rimraf(paths.destination, cb);
});


gulp.task('babel', shell.task([
  'babel src --out-dir app'
  ]));

let express;

gulp.task('server', cb => {
  console.log("starting server");
  express = server.new(paths.destination);
  console.log("server started");
});


gulp.task('restart', cb => {
  console.log("restarting server");
  if (express){
    express.stop();
  }
  express = server.new(paths.destination);
  express.start();

  //express.start().bind(express)();
});


gulp.task('watch', cb => {
  return watch(paths.js, () =>{
    console.log("updated - restarting");
    gulp.start('build');
  });
});



