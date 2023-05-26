ffmpeg -i "2022-05-08 03-48-31.525407.mkv" -c copy -map 0 -f segment -segment_times 00:13:40,00:15:20,01:03:20,01:21:50 -reset_timestamps 1 seg%d.mkv
ffmpeg -i seg1.mkv -filter_complex "[0:v] scale='iw/30:-1', scale='640:480:flags=neighbor'" -af "volume=-35dB" -codec:a aac seg1_pixel.mkv
ffmpeg -i seg3.mkv -filter_complex "[0:v] scale='iw/30:-1', scale='640:480:flags=neighbor'" -af "volume=-35dB" -codec:a aac seg3_pixel.mkv
ffmpeg -f concat -safe 0 -i mylist.txt -c copy lap1_loop8_censored.mkv
