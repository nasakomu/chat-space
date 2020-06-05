Rails.application.routes.draw do
  get 'groups/new'
  devise_for :users
  root to: "messages#index"
  resources :users, only: [:edit, :update]
  resources :groups, only: [:new, :create]
end
