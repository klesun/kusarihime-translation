ffmpeg -i "2022-05-07 20-40-47.0815866.mkv" -c copy -map 0 -f segment -segment_times 00:29:50,00:34:55,00:36:10,00:37:15,01:04:20,01:05:46,01:11:40 -reset_timestamps 1 seg%d.mkv
ffmpeg -i seg1.mkv -filter_complex "[0:v] scale='iw/30:-1', scale='640:480:flags=neighbor'" -af "volume=-40dB" -codec:a aac seg1_pixel.mkv
ffmpeg -i seg3.mkv -filter_complex "[0:v] scale='iw/30:-1', scale='640:480:flags=neighbor'" -af "volume=-40dB" -codec:a aac seg3_pixel.mkv
ffmpeg -i seg5.mkv -filter_complex "[0:v] scale='iw/30:-1', scale='640:480:flags=neighbor'" -af "volume=-40dB" -codec:a aac seg5_pixel.mkv
ffmpeg -i seg7.mkv -filter_complex "[0:v] scale='iw/30:-1', scale='640:480:flags=neighbor'" -af "volume=-40dB" -codec:a aac seg7_pixel.mkv
ffmpeg -f concat -safe 0 -i mylist.txt -c copy lap1_loop4_censored.mkv
