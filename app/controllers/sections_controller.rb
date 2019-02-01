# frozen_string_literal: true

class SectionsController < ApplicationController

  skip_before_action :verify_authenticity_token

  def index
    @sections = Section.all
    @students = Student.where("section_id = #{@sections.first.id}")
  end

  def items
    @students = Student.where("section_id = #{params[:section_id]}")
    render partial: 'student', object: @students
  end

  def student
    @student = Student.where("id = #{params[:id]}")
    render json: {
        name: @student.first.name,
        email: @student.first.email,
        gpa: @student.first.gpa
    }
  end

  def delete
    @student = Student.where("id = #{params[:id]} AND section_id = #{params[:section_id]}")
    if @student.exists?
      begin
        @student.destroy_all
        render json: {
            param: 'success',
            msg: 'Student successfully deleted!'
        }
      rescue StandardError
        render json: {
            param: 'failure',
            msg: 'Cannot destroy student from database!'
        }
      end
    else
      render json: {
          param: 'failure',
          msg: 'Student doesnot exists!'
      }
    end
  end
end
