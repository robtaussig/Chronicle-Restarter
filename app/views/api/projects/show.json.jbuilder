json.extract! @project,
  :id, :title, :content, :author_id, :category_id, :blurb, :duration,
  :goal, :project_img_urls, :location, :saved_project_id,
  :author_full_name, :risks, :website

  json.rewards @project.rewards
  json.funders @project.fundings.length

  amount_array = []
  @project.fundings.each do |funding|
    amount_array << Api::Reward.find(funding.reward_id).amount
  end

  total = amount_array.inject(0){|sum,x| sum + x }

  json.funded total
