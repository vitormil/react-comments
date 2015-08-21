Rails.application.routes.draw do
  resources :comments

  get 'react' => 'comments#react'

  root 'comments#react'
end
