# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161003185039) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "api_comments", force: :cascade do |t|
    t.string   "body",        null: false
    t.string   "title"
    t.integer  "user_id"
    t.integer  "campaign_id", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "api_comments", ["campaign_id"], name: "index_api_comments_on_campaign_id", using: :btree

  create_table "api_fundings", force: :cascade do |t|
    t.integer  "reward_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "user_id"
  end

  add_index "api_fundings", ["reward_id"], name: "index_api_fundings_on_reward_id", using: :btree
  add_index "api_fundings", ["user_id"], name: "index_api_fundings_on_user_id", using: :btree

  create_table "api_projects", force: :cascade do |t|
    t.string   "title",                        null: false
    t.text     "content"
    t.integer  "author_id",                    null: false
    t.integer  "category_id"
    t.integer  "goal"
    t.string   "project_img_urls"
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.text     "blurb"
    t.integer  "duration"
    t.string   "location"
    t.integer  "saved_project_id"
    t.string   "author_full_name"
    t.string   "website"
    t.text     "risks"
    t.string   "image"
    t.string   "project_picture_file_name"
    t.string   "project_picture_content_type"
    t.integer  "project_picture_file_size"
    t.datetime "project_picture_updated_at"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
  end

  add_index "api_projects", ["author_id"], name: "index_api_projects_on_author_id", using: :btree
  add_index "api_projects", ["category_id"], name: "index_api_projects_on_category_id", using: :btree
  add_index "api_projects", ["location"], name: "index_api_projects_on_location", using: :btree

  create_table "api_rewards", force: :cascade do |t|
    t.integer  "project_id",         null: false
    t.string   "title"
    t.integer  "amount"
    t.string   "description"
    t.integer  "quantity"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.integer  "project_reward_key"
  end

  add_index "api_rewards", ["project_id"], name: "index_api_rewards_on_project_id", using: :btree

  create_table "api_saved_projects", force: :cascade do |t|
    t.string   "title"
    t.text     "content"
    t.integer  "author_id"
    t.integer  "category_id"
    t.integer  "goal"
    t.string   "project_img_urls"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.text     "blurb"
    t.integer  "duration"
    t.string   "location"
    t.text     "risks"
    t.string   "image"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
  end

  create_table "api_sessions", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "api_updates", force: :cascade do |t|
    t.integer  "campaign_id", null: false
    t.string   "body",        null: false
    t.string   "title",       null: false
    t.integer  "user_id",     null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "api_updates", ["campaign_id"], name: "index_api_updates_on_campaign_id", using: :btree

  create_table "api_users", force: :cascade do |t|
    t.string   "username",            null: false
    t.string   "password_digest",     null: false
    t.string   "session_token",       null: false
    t.string   "email"
    t.string   "pic_url"
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
    t.string   "location"
    t.text     "biography"
    t.string   "website"
    t.string   "full_name"
    t.string   "verified"
    t.string   "verification_status"
    t.string   "photo_file_name"
    t.string   "photo_content_type"
    t.integer  "photo_file_size"
    t.datetime "photo_updated_at"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
  end

  add_index "api_users", ["email"], name: "index_api_users_on_email", using: :btree
  add_index "api_users", ["username"], name: "index_api_users_on_username", using: :btree

  create_table "comments", force: :cascade do |t|
    t.string   "body",        null: false
    t.string   "title"
    t.integer  "user_id"
    t.integer  "campaign_id", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "comments", ["campaign_id"], name: "index_comments_on_campaign_id", using: :btree

  create_table "stories", force: :cascade do |t|
    t.string   "title",      null: false
    t.text     "body",       null: false
    t.integer  "author_id",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "stories", ["author_id"], name: "index_stories_on_author_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "email"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
