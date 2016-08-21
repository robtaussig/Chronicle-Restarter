json.extract! @saved_project,
  :id, :title, :content, :author_id, :category_id,
  :goal, :duration, :location, :blurb, :risks, :image

json.rewards @saved_project.rewards
json.author @saved_project.author
