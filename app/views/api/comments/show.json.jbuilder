json.extract! @comment,
:body, :title, :user_id, :campaign_id, :id

json.email @comment.author.email
