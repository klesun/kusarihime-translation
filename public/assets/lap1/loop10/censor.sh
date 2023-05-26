ffmpeg -i "2022-05-08 10-58-59.3715287.mkv" -c copy -map 0 -f segment -segment_times 00:23:00,00:33:50 -reset_timestamps 1 seg%d.mkv
ffmpeg -i seg1.mkv -filter_complex "[0:v] scale='iw/30:-1', scale='640:480:flags=neighbor'" -af "volume=-35dB" -codec:a aac seg1_pixel.mkv
ffmpeg -f concat -safe 0 -i mylist.txt -c copy lap1_loop10_censored.mkv
