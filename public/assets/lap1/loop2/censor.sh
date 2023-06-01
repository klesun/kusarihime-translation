ffmpeg -i "2022-05-07 16-49-15.1069472.mkv" -c copy -map 0 -f segment -segment_times 01:16:20,01:17:25,01:28:00,01:32:00 -reset_timestamps 1 seg%d.mkv
ffmpeg -i seg1.mkv -filter_complex "[0:v] scale='iw/30:-1', scale='640:480:flags=neighbor'" -af "volume=-40dB" -codec:a aac seg1_pixel.mkv
ffmpeg -i seg3.mkv -filter_complex "[0:v] scale='iw/30:-1', scale='640:480:flags=neighbor'" -af "volume=-40dB" -codec:a aac seg3_pixel.mkv
ffmpeg -f concat -safe 0 -i mylist.txt -c copy lap1_loop2_censored.mkv
