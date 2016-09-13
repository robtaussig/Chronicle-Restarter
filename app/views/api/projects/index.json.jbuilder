json.array! @projects do |project|
  json.id project.id
  json.title project.title
  json.blurb project.blurb
  json.author_id project.author_id
  json.category_id project.category_id
  json.goal project.goal

  json.duration project.duration
  json.location project.location
  json.content project.content
  json.author_full_name project.author_full_name
  json.risks project.risks
  json.website project.website
  json.rewards project.rewards
  json.funders project.fundings.length
  amount_array = []
  project.fundings.each do |funding|
    amount_array << Api::Reward.find(funding.reward_id).amount
  end
  if project.image.class === 'string'
    json.project_img_urls project.project_img_urls
  else
    json.image asset_path(project.image.url)
  end
  total = amount_array.inject(0){|sum,x| sum + x }
  if project.goal > 0
    progress = total.fdiv(project.goal)
    json.progress progress
  end
  json.funded total
end
