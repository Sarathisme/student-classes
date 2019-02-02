# frozen_string_literal: true

class CustomValidator

  def initialize(name=nil, email=nil, gpa=nil)
    @name = name
    @email = email
    @gpa = gpa
  end

  def validate_email?
    @email = @email.to_s unless @email.is_a? String
    URI::MailTo::EMAIL_REGEXP.match(@email).nil?
  end

  def validate_name?
    @name = @name.to_s unless @name.is_a? String
    /[a-zA-Z]$/.match(@name).nil?
  end

  def validate_gpa?
    @gpa = @gpa.to_s unless @gpa.is_a? String
    /\A[+-]?\d+(\.[\d]+)?\z/.match(@gpa).nil?
  end
  
  def get_error_msg(email=nil, name=nil, gpa=nil)
    message = 'Check your entries: '
    message += 'email, ' if email === true
    message += 'name, ' if name === true
    message += 'gpa, ' if gpa === true

    message = message.chomp(',')
    return message
  end
end