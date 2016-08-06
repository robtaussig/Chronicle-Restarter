Rails.application.routes.draw do

  get "/signUp", to: 'static_pages#root'
  get "/logIn", to: 'static_pages#root'
  get "/userProfile", to: 'static_pages#root'
  get "/startProject", to: 'static_pages#root'
  get "/createProject", to: 'static_pages#root'
  get "/finalizeProject", to: 'static_pages#root'
  get "/finalizeProject/basics", to: 'static_pages#root'
  get "/finalizeProject/rewards", to: 'static_pages#root'
  get "/finalizeProject/story", to: 'static_pages#root'
  get "/finalizeProject/about_you", to: 'static_pages#root'
  get "/finalizeProject/account", to: 'static_pages#root'
  get "/finalizeProject/preview", to: 'static_pages#root'

  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:new, :create, :show, :destroy]
    resource :session, only: [:create, :destroy]
    resources :projects
    resources :saved_projects
    resources :rewards
  end
end
