class Comment < ApplicationRecord
  belongs_to :news

  # Validations
  validate :comment, :username, presence: true
end
