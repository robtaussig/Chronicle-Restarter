json.array! @rewards do |reward|
  json.title project.title
  json.amount project.amount
  json.project_id project.project_id
  json.project_reward_key project.project_reward_key
  json.quantity project.quantity
  json.description project.description
end
