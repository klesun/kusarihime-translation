ffmpeg -i "2022-05-08 13-08-28.3613397.mkv" -c copy -map 0 -f segment -segment_times 00:38:05,00:38:15,01:21:45,01:26:35 -reset_timestamps 1 seg%d.mkv
ffmpeg -i seg1.mkv -filter_complex "[0:v] scale='iw/30:-1', scale='640:480:flags=neighbor'" -af "volume=-35dB" -codec:a aac seg1_pixel.mkv
ffmpeg -i seg3.mkv -filter_complex "[0:v] scale='iw/30:-1', scale='640:480:flags=neighbor'" -af "volume=-35dB" -codec:a aac seg3_pixel.mkv
ffmpeg -f concat -safe 0 -i mylist.txt -c copy lap2_loop1_censored.mkv
