class CreateApiSavedProjects < ActiveRecord::Migration
  def change
    create_table :api_saved_projects do |t|
      t.string :title
      t.text :content
      t.integer :author_id
      t.integer :category_id
      t.integer :goal
      t.string :project_img_urls
      t.date :project_due_date
      t.timestamps null: false
    end
  end
end
