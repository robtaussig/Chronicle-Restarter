class CreateApiProjects < ActiveRecord::Migration
  def change
    create_table :api_projects do |t|
      t.string :title, null: false
      t.text :content
      t.integer :author_id, null: false
      t.integer :category_id
      t.integer :goal
      t.string :project_img_urls
      t.date :project_due_date
      t.timestamps null: false
    end
    add_index :api_projects, :title, unique: true
    add_index :api_projects, :category_id
    add_index :api_projects, :author_id
  end
end
