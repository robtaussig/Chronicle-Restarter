Rails.application.routes.draw do

  get "/signUp", to: 'static_pages#root'
  get "/logIn", to: 'static_pages#root'
  get "/userProfile", to: 'static_pages#root'
  get "/startProject", to: 'static_pages#root'
  get "/createProject", to: 'static_pages#root'
  get "/finalizeProject", to: 'static_pages#root'

  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:new, :create, :show, :destroy]
    resource :session, only: [:create, :destroy]
    resources :projects
    resources :saved_projects
  end
end
