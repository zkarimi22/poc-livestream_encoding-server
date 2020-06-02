const child_process = require('child_process');  
const app = require("express")()
const http = require("http").createServer(app)
const io = require("socket.io")(http)

io.on('connection', function(socket) { 

        try { 
 
			  const ffmpeg = child_process.spawn('ffmpeg', [
			  	//send encoded output from FFMPEG to AWS
			  	'-i', '-','-vcodec', 'copy','-acodec', 'aac','-f', 'flv','rtmp://54.144.122.20:1935/app1/live1' 

			  	//send encoded output from FFMPEG to self-hosted media-server 
			  	// '-i', '-','-vcodec', 'copy','-acodec', 'aac','-f', 'flv','rtmp://127.0.0.1/live/app1' 

			  ]);
			   
			  ffmpeg.stdin.on('error', (e) => {
			    console.log('FFmpeg STDIN Error', e);
			  });
			  
			  
			  ffmpeg.stderr.on('data', (data) => {
			    console.log('FFmpeg STDERR:', data.toString());
			  }); 
			  ffmpeg.on('close', (code, signal) => {
			    console.log('FFmpeg child process closed, code ' + code + ', signal ' + signal);
			    socket.disconnect();
			  });
			   
 
			  socket.on('event', (data) => {
			    console.log('DATA', data);
			    ffmpeg.stdin.write(data);
			  });
			  
			  // If the client disconnects, stop FFmpeg.
			  ws.on('close', (e) => {
			    ffmpeg.kill('SIGINT');
			  });

			   socket.on('disconnect', function() { 
 				ffmpeg.kill('SIGINT'); 
				});

			    } 
			    
    	catch (e) {
			      console.log("Capture error", e);
			    }


});

http.listen(4000, () => {
  console.log("listening on 4000")
})


 
