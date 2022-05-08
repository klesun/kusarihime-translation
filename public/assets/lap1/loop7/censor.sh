ffmpeg -i "2022-05-08 01-08-18.4523874.mkv" -c copy -map 0 -f segment -segment_times 00:07:00,00:30:30,00:33:33,00:45:15,00:48:20,00:59:20,01:27:40,02:06:15,02:07:20,02:13:20,02:17:45 -reset_timestamps 1 seg%d.mkv
ffmpeg -i seg0.mkv -filter_complex "[0:v] scale='iw/30:-1', scale='640:480:flags=neighbor'" -af "volume=-35dB" -codec:a aac seg0_pixel.mkv
ffmpeg -i seg2.mkv -af "volume=-40dB" -codec:a aac seg2_pixel.mkv
ffmpeg -i seg4.mkv -af "volume=-40dB" -codec:a aac seg4_pixel.mkv
ffmpeg -i seg6.mkv -filter_complex "[0:v] scale='iw/30:-1', scale='640:480:flags=neighbor'" -af "volume=-40dB" -codec:a aac seg6_pixel.mkv
ffmpeg -i seg8.mkv -af "volume=-40dB" -codec:a aac seg8_pixel.mkv
ffmpeg -i seg10.mkv -filter_complex "[0:v] scale='iw/30:-1', scale='640:480:flags=neighbor'" -af "volume=-40dB" -codec:a aac seg10_pixel.mkv
ffmpeg -f concat -safe 0 -i mylist.txt -c copy lap1_loop7_censored.mkv
