json.content    @message.content
json.image      @message.image
json.image_url  @message.image.url
json.created_at @message.created_at.to_s.gsub(/(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}).+/,'\1年\2月\3日 \4時\5分')
json.user_name  @message.user.name